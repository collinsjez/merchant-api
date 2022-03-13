import {
    cleanEnv, str,
  } from 'envalid';
   
  function validateEnv() {
    cleanEnv(process.env, {
      MONGO_PASSWORD: str(),
      MONGO_PATH: str(),
      MONGO_USER: str(),
      PORT: port(),
    });
  }

function port(): import("envalid").ValidatorSpec<unknown> {
    throw new Error('Function not implemented.');
}
