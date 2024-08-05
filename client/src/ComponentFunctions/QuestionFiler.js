//functions for sorting string api responses into response objects with question/option/answer fields

const fileQuestionMC = (str) => {
    let startOfQuestion = str.indexOf("Question: ") + "Question: ".length;
    let endOfQuestions = str.indexOf("Options:");
    let lengthOfPreceding = "Options:".length;
    
    if (endOfQuestions === -1) {
        endOfQuestions = str.indexOf("A)");
        lengthOfPreceding = 2;
    }

    let question = str.slice(startOfQuestion, endOfQuestions).trim();

    let startOfOptions = endOfQuestions + lengthOfPreceding;
    let endOfOptions = str.indexOf("Answer:");
    let options = str.slice(startOfOptions, endOfOptions).split("\n");

    options = options.slice(1,5);

    let answer = str.slice(endOfOptions + "Answer:".length).trim();

    const filtered = {
        question: question,
        options: options,
        answer: answer,
        qType: "mc"
    };

    return filtered;
};

const fileQuestionTF = (str) => {
    let types = str.split(":")

    const answer = types[2].trim().toLowerCase()
    if (answer.endsWith('.')) {
      answer = answer.slice(0, -1);
    }

    const filtered = {
      question: types[1].split("\n")[0],
      options: ["true","false"],
      answer: answer,
      qType: "tf"
    };
    console.log(filtered)
    return filtered
  }


module.exports = {fileQuestionMC,fileQuestionTF}