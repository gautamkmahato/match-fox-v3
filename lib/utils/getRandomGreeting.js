export default function getRandomGreeting(username, interviewName) {
  const hasInterviewWord = interviewName?.toLowerCase().includes("interview");

  const greetingsIfInterviewMentioned = [
    `Hi ${username}, how are you? Let's get started on your interview when you're ready.`,
    `Hello ${username}! I'm excited to begin. Shall we start the interview?`,
    `Hey ${username}, ready to start your interview?`,
    `Nice to meet you, ${username}. Let’s begin the interview.`,
    `Welcome ${username}, we can begin the interview when you’re ready.`,
  ];

  const greetingsIfNotMentioned = [
    `Hi ${username}, how are you? Ready for your interview on "${interviewName}"?`,
    `Hello ${username}! Ready for your interview on "${interviewName}"?`,
    `Hi ${username}! how are you? Let's start your interview on "${interviewName}"?`,
    `Hello ${username}! how are you? Let's start your interview on "${interviewName}"?`,
    `Hey ${username}, let’s begin your interview focused on "${interviewName}".`,
  ];

  const options = hasInterviewWord ? greetingsIfInterviewMentioned : greetingsIfNotMentioned;

  // Pick one randomly
  const index = Math.floor(Math.random() * options.length);
  return options[index];
}
