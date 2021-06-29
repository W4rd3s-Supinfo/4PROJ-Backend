import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:UrlParamsExtractor-middleware');

class UrlParamsExtractorMiddleware {
  urlParamsExtractor(input: Array<string>, output: Array<string>) {
    return async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction,
    ) => {
      if (input.length === output.length) {
        log(`Extract url params for ${req.route.path}: ${input} -> ${output}`);
        for (let i = 0; i < input.length; i += 1) {
          req.body[output[i]] = req.params[input[i]];
        }
        return next();
      }
      log('Error on extract url params');
      return res.sendStatus(500);
    };
  }
}

export default new UrlParamsExtractorMiddleware();
