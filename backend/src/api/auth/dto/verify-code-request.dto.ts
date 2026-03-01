import { IsString, Length } from "class-validator";

export class VerifyCodeRequest {
    @IsString({message: "Код должен быть строкой"})
	@Length(6,6, {message: "Код должен быть из 6 символов!"})
    code: string
}
