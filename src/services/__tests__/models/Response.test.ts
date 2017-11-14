import { ResponseModel } from '../../models/Response';
import { OpenAPIParser } from '../../OpenAPIParser';


describe('Models', () => {
  describe('ResponseModel', () => {
    let parser;

    beforeEach(() => {
      parser = new OpenAPIParser();
      parser.spec = <any>{};
    })

    test('should calculate response type based on code', () => {
      let resp = new ResponseModel(parser, '200', false, {});
      expect(resp.type).toEqual('success');
      resp = new ResponseModel(parser, '120', false, {});
      expect(resp.type).toEqual('info');
      resp = new ResponseModel(parser, '301', false, {});
      expect(resp.type).toEqual('redirect');
      resp = new ResponseModel(parser, '400', false, {});
      expect(resp.type).toEqual('error');
    });

    test('default should be sucessful by default', () => {
      let resp = new ResponseModel(parser, 'default', false, {});
      expect(resp.type).toEqual('success');
    });

    test('default should be error if defaultAsError is true', () => {
      let resp = new ResponseModel(parser, 'default', true, {});
      expect(resp.type).toEqual('error');
    });
  });
});
