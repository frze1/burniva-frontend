const express =
  require('express')

const router =
  express.Router()

const authMiddleware =
  require(
    '../middleware/authMiddleware'
  )

const {
  createAssessment,
} = require(
  '../controllers/assessmentController'
)

router.post(
  '/',
  authMiddleware,
  createAssessment
)

module.exports =
  router