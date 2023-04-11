import { DUPLICATE_KEY_CODE } from "../constants";
import HttpException from "./HttpException";

export default class TypeOrmException extends HttpException {
    constructor(error: any) {
        if (error.code === DUPLICATE_KEY_CODE) {
            super(409, error.detail)
        }
    }
}