const { getAssumeRoleSQS } = require('./awsAuth')
const sqs = getAssumeRoleSQS()
const context = require('../util/context')
const { Consumer } = require('sqs-consumer')
const githubController = require('../controller/githubController')
const logger = require('../util/logger')
const queueURL = process.env.JOBS_TODO

/**
 * Comsumer da Fila SQS
 */
const sqsConsumer = Consumer.create({
  queueUrl: queueURL,
  messageAttributeNames: ['check_run_id', 'status', 'conclusion'],
  handleMessage: async (message) => {
    const payload = JSON.parse(message.Body)
    const check = !message.MessageAttributes.conclusion
      ? {
          check_run_id: message.MessageAttributes.check_run_id.StringValue,
          status: message.MessageAttributes.status.StringValue
        }
      : {
          check_run_id: message.MessageAttributes.check_run_id.StringValue,
          status: message.MessageAttributes.status.StringValue,
          conclusion: message.MessageAttributes.conclusion.StringValue
        }
    const contexto = await context.createContextforOrg(payload)
    return await githubController.checkUpdate(contexto, check)
  },
  sqs
})

sqsConsumer.on('error', (err) => {
  logger.error(context, `sqsConsumer => error: ${err}`)
})

sqsConsumer.on('processing_error', (err) => {
  logger.error(context, `sqsConsumer.processing_error => error: ${err.message}`)
})

module.exports = sqsConsumer
