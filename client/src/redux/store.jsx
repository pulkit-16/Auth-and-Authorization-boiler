const { configureStore } = require("@reduxjs/toolkit");
import loadersReducer from './loadersSlice'
import usersReducer from './usersSlice'

const store = configureStore({
  reducer: {
    loaders: loadersReducer,
    users: usersReducer
  }
})