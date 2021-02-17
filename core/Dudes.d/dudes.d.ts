export namespace Dudes {
    export namespace Session {
        export interface Session {
            user_id:number,
            refresh_token:string,
            expires_in:number,
            created_at:number,
            updated_at:number
        }

        export interface SessionCreateParams {
            username:string,
            roles:Array<string>,
            expiration:number,
            userId:string,
            temporary:boolean
        }

        export interface SessionResponse {
            status:boolean,
            code:number,
            details?:string | object
        }
    }
    export interface User {
        id:number,
        name:string,
        password:string,
        email:string,
        roles:Array<string>
    }

    export interface Group {
        id:number,
        creator_id:number,
        admin_ids:Array<number>,
        title:string,
        picture:string,
        products:Array<number>,
        hashed_state:string
    }

    export interface MailStatus {
        status:boolean,
        context:object | string
    }

    export interface TokenGeneratingParams {
        username:string,
        roles:Array<string>,
        expiration:number,
        temporary:boolean
    }

    export interface TokenPayload {
        username:string,
        roles:Array<string>
    }
}
