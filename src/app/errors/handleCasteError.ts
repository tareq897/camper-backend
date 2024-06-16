import mongoose from 'mongoose';
import { ErrorSources, GenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): GenericErrorResponse => {
  const errorSources: ErrorSources = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  const statusCode = 400;

  return {
    statusCode,
    message: 'Invalid ID',
    errorSources,
  };
};

export default handleCastError;