const UsersController = () => import('#controllers/users_controller')
const AuthenticatesController = () => import('#controllers/authenticates_controller')
const CategoriesController = () => import('#controllers/categories_controller')
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
const AccessibilitiesController = () => import('#controllers/accessibilities_controller')
const TasksController = () => import('#controllers/tasks_controller')

router.post('/login/email', [AuthenticatesController, 'authenticateWithEmailAndPassword'])
router.post('/login/google', [AuthenticatesController, 'authenticateWithGoogle'])
router.post('/users', [UsersController, 'create'])

router
  .group(() => {
    router
      .group(() => {
        router.get('/', [CategoriesController, 'getByName'])
        router.get('/:id', [CategoriesController, 'getById'])
        router.put('/:id', [CategoriesController, 'update'])
        router.post('/', [CategoriesController, 'create'])
        router.delete('/:id', [CategoriesController, 'delete'])
      })
      .prefix('/categories')

    router
      .group(() => {
        router.get('/', [UsersController, 'getById'])
        router.get('/email', [UsersController, 'getByEmail'])
        router.patch('/name', [UsersController, 'updateName'])
        router.patch('/email', [UsersController, 'updateEmail'])
        router.patch('/password', [UsersController, 'updatePassword'])
        router.delete('/', [UsersController, 'delete'])
      })
      .prefix('/users')

    router
      .group(() => {
        router.get('/:id', [TasksController, 'getById'])
        router.get('/', [TasksController, 'getByUserId'])
        router.put('/:id', [TasksController, 'update'])
        router.post('/', [TasksController, 'create'])
        router.delete('/:id', [TasksController, 'delete'])
      })
      .prefix('/tasks')

    router
      .group(() => {
        router.get('/', [AccessibilitiesController, 'getByUserId'])
        router.get('/:id', [AccessibilitiesController, 'getById'])
        router.post('/', [AccessibilitiesController, 'create'])
        router.put('/', [AccessibilitiesController, 'update'])
        router.delete('/:id', [AccessibilitiesController, 'delete'])
      })
      .prefix('/userAccessibility')

    router.post('/logout', [AuthenticatesController, 'logout'])
  })
  .use([middleware.auth()])
