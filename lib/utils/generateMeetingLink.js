
export default async function generateMeetingLikn(id){
    const random = Math.random();
    const token = id + random * 1000000;
    const url = `https://inview.app/meeting/${token}`;

    return url;
}