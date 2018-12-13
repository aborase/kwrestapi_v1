class Feedback {
  constructor(feedbackId, questionId, userId, active){
        this.questionId = questionId ;
        this.feedbackId = feedbackId ;        
        this.userId = userId ;       
        this.active = active ;
  }
}
module.exports = Feedback;