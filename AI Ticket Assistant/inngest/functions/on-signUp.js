import {inngest} from "../client";
import User from "../../models/user.js";
import { NonRetriableError } from "inngest";

export const onSignUp = inngest.createFunction(

    {id: "on-user-signUp", retries : 2},
    {event: "user/signUp"},
    async ({event, step}) => {
        try{
            const {email} = event.data;
            const user = await step.run("get-user-email",  async()=> {
               const userObject = await User.findOne({email});
               if(!userObject){
                     throw new NonRetriableError("User no longer exists in out DataBase");
               }
                return userObject;
            })
            await step.run("send-welcome-email", async()=>{
                const subject = `Welcome to out app`
                const message = `Hi,
                \n\n
                Thanks for signing up. We're glad to have you on board!`

                await sendMail(user.email, subject, message)
            })

            return {success: true}
        } catch(error){
            console.error("❌Error running step", error.message);
            return {success: false}
        }
    }
)