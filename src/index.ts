import { UserForm } from './views/UserForm'
import { User } from './models/User'

const user = User.buildUser({ name: "umair", age: 22 })
const userForm = new UserForm(document.getElementById('app'), user)

userForm.render()