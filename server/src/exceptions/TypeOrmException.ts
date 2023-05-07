import { DUPLICATE_KEY_CODE, FK_RECORD_NOT_FOUND } from "../constants";
import HttpException from "./HttpException";

export default class TypeOrmException extends HttpException {
    constructor(error: any) {
        console.log(error.message);

        if (error.code) {
            if (error.code === DUPLICATE_KEY_CODE) {
                super(409, error.detail)
            } else if (error.code == FK_RECORD_NOT_FOUND) {
                super(404, error.detail)
            } else {
                super(500, error.detail)
            }
        } else {
            super(500, error.message)
        }
    }
}