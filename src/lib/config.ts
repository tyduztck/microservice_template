import * as fs from 'fs';
import * as nconf from 'nconf';
const nconfYaml = require ("nconf-yaml");
import * as path from "path";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IConfig {}

export default class Config extends nconf.Provider {
  private readonly environment: string = process.env.NODE_ENV || 'development';
  private readonly configName: string = 'config';
  private readonly configFolderPath: string;
  private readonly baseConfigPath: string;
  private readonly envConfigPath: string;
  private readonly localConfigPath: string;
  private readonly hasBaseConfig: boolean;
  private readonly hasEnvConfig: boolean;
  private readonly hasLocalConfig: boolean;

  public static _config: Config;

  public static get<T extends IConfig = IConfig>(name: string): T {
    if (!Config._config) {
      Config._config = new Config();
    }

    return Config._config.get(name);
  }

  constructor(configName: string = 'config') {
    super({});
    this.configFolderPath = path.join(__dirname, '../../', 'config');
    this.configName = configName;
    this.baseConfigPath = path.join(__dirname, '../../', 'config', `${this.configName}.yaml`);
    this.envConfigPath = path.join(__dirname, '../../', 'config', `${this.configName}.${this.environment}.yaml`);
    this.localConfigPath = path.join(__dirname, '../../', 'config', `${this.configName}.${this.environment}.local.yaml`);
    this.hasBaseConfig = fs.existsSync(this.baseConfigPath);
    this.hasEnvConfig = fs.existsSync(this.envConfigPath);
    this.hasLocalConfig = fs.existsSync(this.localConfigPath);

    if (!this.hasBaseConfig && !this.hasEnvConfig) {
      throw new Error(`Could not find ${this.envConfigPath} or ${this.baseConfigPath}.`);
    }

    this.loadEnv();
    this.loadFiles();
  }

  public loadEnv(): void {
    this.argv();
  }

  public loadFiles(): void {
    if (this.hasLocalConfig) {
      this.file('local', {
        file: `${this.configName}.${this.environment}.local.yaml`,
        dir: this.configFolderPath,
        format: nconfYaml,
        search: true,
      });
    }

    if (this.hasEnvConfig) {
      this.file('environment', {
        file: `${this.configName}.${this.environment}.yaml`,
        dir: this.configFolderPath,
        format: nconfYaml,
        search: true,
      });
    }

    if (this.hasBaseConfig) {
      this.file('base', {
        file: `${this.configName}.yaml`,
        dir: this.configFolderPath,
        format: nconfYaml,
        search: true,
      });
    }
  }
}
