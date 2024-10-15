import { ApiProperty } from "@nestjs/swagger";
import { Entity } from "typeorm";

@Entity({name: 'auth', schema: 'auth'})
export class Auth {

// @ApiProperty({example: 1})
}
