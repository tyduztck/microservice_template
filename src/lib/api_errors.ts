export enum List {
    NO_CONTENT = 204,
    NOT_AUTHORIZED = 401,
    NO_ACCESS = 403,
    METHOD_NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
    UNKNOWN_ERROR = 1000,
    INVALID_PARAMETER = 1001,
    INVALID_CREDENTIALS = 1002,
    INVALID_TOKEN = 1003,
}

export class ApiError extends Error {
    public name: string = "";
    public code: number = 0;
    public internal: boolean = true;

    constructor(code: List) {
        super();
        this.name = List[code];
        this.code = code;
    }
}
