const { User, Todo, DailyInput, Prediction } = require('./src/models');
const { createAssessment } = require('./src/controllers/assessmentController');

async function runTests() {
  console.log('--- STARTING PHASE 9 TESTS ---');
  let passed = 0;
  let failed = 0;

  // 0. Setup dummy user and res/req mocks
  const dummyUser = await User.findOne({ where: { email: 'test@example.com' } }) || 
                    await User.create({ name: 'Test User', email: 'test@example.com', password: 'password123' });

  const mockRes = () => {
    const res = {};
    res.status = (code) => { res.statusCode = code; return res; };
    res.json = (data) => { res.data = data; return res; };
    return res;
  };

  const getMockReq = () => ({
    user: { id: dummyUser.id },
    body: {
      stress: 8, anxiety: 7, emotional_pressure: 6, academic_pressure: 9,
      study_hours: 7, sleep_hours: 4, financial_pressure: 8, family_expectation: 7,
      social_support: 3, activity_hours: 2
    }
  });

  // Clean old todos
  await Todo.destroy({ where: { user_id: dummyUser.id } });

  // SCENARIO 10: Manual Todo Tetap Aman
  const manualTodo = await Todo.create({
    user_id: dummyUser.id, title: 'Beli Buku', description: 'Beli buku algoritma',
    priority: 'high', status: 'pending', generated_by_ai: false
  });
  console.log('✅ Created manual todo');

  // SCENARIO 1, 2, 3, 4, 5: Normal Flow
  let req = getMockReq();
  let res = mockRes();
  
  // Real execution
  console.log('⏳ Running normal assessment (AI Engineer & Gemini)...');
  await createAssessment(req, res);
  
  const aiTodos1 = await Todo.findAll({ where: { user_id: dummyUser.id, generated_by_ai: true } });
  if (aiTodos1.length >= 3 && aiTodos1.length <= 5) {
    console.log('✅ S1-S5: Assessment, AI Engineer, Gemini success. Todos saved (Count: ' + aiTodos1.length + ')');
    passed++;
  } else {
    console.log('❌ S1-S5 Failed'); failed++;
  }

  // SCENARIO 6: Refresh tidak duplicate
  console.log('⏳ Running duplicate prevention test (refreshing assessment)...');
  req = getMockReq();
  res = mockRes();
  await createAssessment(req, res);
  
  const aiTodos2 = await Todo.findAll({ where: { user_id: dummyUser.id, generated_by_ai: true } });
  if (aiTodos2.length === aiTodos1.length) {
    console.log('✅ S6: Duplicate prevention success. Old pending AI todos were deleted before creating new ones.');
    passed++;
  } else {
    console.log('❌ S6 Failed'); failed++;
  }

  // Verify Scenario 10
  const checkManual = await Todo.findByPk(manualTodo.id);
  if (checkManual) {
    console.log('✅ S10: Manual todo is safe and untouched.');
    passed++;
  } else {
    console.log('❌ S10 Failed'); failed++;
  }

  // SCENARIO 7 & 8: Gemini Gagal/Timeout (Simulate by breaking API KEY)
  console.log('⏳ Simulating Gemini Failure (Invalid API Key)...');
  const realKey = process.env.GEMINI_API_KEY;
  process.env.GEMINI_API_KEY = 'invalid_key';
  req = getMockReq();
  res = mockRes();
  await createAssessment(req, res);
  
  const aiTodosFallback = await Todo.findAll({ where: { user_id: dummyUser.id, generated_by_ai: true } });
  if (aiTodosFallback.length > 0 && aiTodosFallback[0].title === 'Perbaiki Jam Tidur') { // dummy fallback title
    console.log('✅ S7-S8: Gemini failure gracefully handled by fallback dummy todos.');
    passed++;
  } else {
    console.log('❌ S7-S8 Failed'); failed++;
  }
  process.env.GEMINI_API_KEY = realKey; // restore

  // SCENARIO 9: AI Engineer Gagal (Simulate by breaking Railway URL)
  console.log('⏳ Simulating AI Engineer Failure (Invalid URL)...');
  const realAiUrl = process.env.AI_API_URL;
  process.env.AI_API_URL = 'http://invalid-url.com/predict';
  req = getMockReq();
  res = mockRes();
  await createAssessment(req, res);
  
  if (res.statusCode === 201 && res.data.burnout_level) {
    console.log('✅ S9: AI Engineer failure gracefully handled. Status 201 returned with fallback logic.');
    passed++;
  } else {
    console.log('❌ S9 Failed'); failed++;
  }
  process.env.AI_API_URL = realAiUrl; // restore

  console.log('--- TEST RESULTS ---');
  console.log(`PASSED: ${passed}/5`);
  if (failed === 0) {
    console.log('ALL TESTS PASSED SUCCESSFULLY 🚀');
  } else {
    console.log(`FAILED: ${failed}`);
  }
  process.exit(failed > 0 ? 1 : 0);
}

runTests();
