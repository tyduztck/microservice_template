import { Express, Request, Response } from "express";
import { getUserData } from './interactor/micro_interactor';
import authenticateToken from './middleware/authentication';

function routes(app: Express) {
    /**
    * @openapi
    * /user/:username:
    *  get:
    *     tags:
    *     - User
    *     description: Responds if the app is up and running
    *     responses:
    *       200:
    *         description: App is up and running
    */
    app.get('/user/:username', authenticateToken, async (req: Request, res: Response) => {
        const username = req.params.username;
        const userData = await getUserData(username);
        res.json(userData);
    });
}

export default routes;