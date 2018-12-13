class Question {
  constructor(questionId, eventSessionId, questionStatusId, userId, approverId, question, active){
        this.questionId = questionId ;
        this.eventSessionId = eventSessionId ;
        this.questionStatusId = questionStatusId ;
        this.userId = userId ;
        this.approverId = approverId ;
        this.question = question ;
        this.active = active ;
  }
}
module.exports = Question;