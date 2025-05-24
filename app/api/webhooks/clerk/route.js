import { Webhook } from 'svix'
import { headers } from 'next/headers'
import createNewUser from '@/app/service/user/createNewUser'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import addUsage from '@/app/service/interview/addUsage'


// export async function POST(req) {
//   const SIGNING_SECRET = process.env.SIGNING_SECRET

//   if (!SIGNING_SECRET) {
//     throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
//   } 

//   // Create new Svix instance with secret
//   const wh = new Webhook(SIGNING_SECRET)

//   // Get headers
//   const headerPayload = await headers()
//   const svix_id = headerPayload.get('svix-id')
//   const svix_timestamp = headerPayload.get('svix-timestamp')
//   const svix_signature = headerPayload.get('svix-signature')

//   // If there are no headers, error out
//   if (!svix_id || !svix_timestamp || !svix_signature) {
//     return new Response('Error: Missing Svix headers', {
//       status: 400,
//     })
//   }

//   // Get body
//   const payload = await req.json()
//   const body = JSON.stringify(payload)

//   let evt
//   // Verify payload with headers
//   try {
//     evt = wh.verify(body, {
//       'svix-id': svix_id,
//       'svix-timestamp': svix_timestamp,
//       'svix-signature': svix_signature,
//     })
//   } catch (err) {
//     console.error('Error: Could not verify webhook:', err)
//     return new Response('Error: Verification error', {
//       status: 400,
//     })
//   }

//   // Do something with payload
//   // For this guide, log payload to console
//   const { id } = evt.data
//   const eventType = evt.type
//   console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
//   //console.log('Webhook payload:', body);
//    console.log("===================================================")
//    console.log(payload);

//   const fullName = payload.data.first_name + " " + payload.data.last_name;

//   const inputData = {  
//     id: id,
//     name: fullName,
//     username: payload.data?.username,
//     email: payload["data"]["email_addresses"][0]["email_address"],
//     img_url: payload.data?.profile_image_url
//   }

//   console.log(inputData);


//   // save user to the DB
//   const result = await createNewUser(inputData);
//   console.log("result: ", result);


//   return new Response('Webhook received', { status: 200 })
// }


export async function POST(req) {
  try {
    const evt = await verifyWebhook(req)

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data
    const eventType = evt.type
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    // Handle specific event types
    if (evt.type === 'user.created') {
      console.log('New user created:', evt.data?.id)
      // Handle user creation
      const input = {
        clerk_id: evt.data?.id,
        email: evt.data?.email_addresses[0]?.email_address,
        name: evt.data?.first_name + " " + evt.data?.last_name,
        username: evt.data?.username, 
        img_url: evt.data?.image_url
      }
      console.log(input);

      // save user to the DB
      const result = await createNewUser(input);
      if(!result?.state){
        return new Response('Error in creating user', { status: 500 })
      }
      console.log(result?.data);

    }

    return new Response('Webhook received Successfully', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}