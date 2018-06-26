const parseDuration = require('./parse-persistence-duration');

describe('The parseDuration component', () => {
  describe('invoked with valid duration', () => {
    it('correctly parses seconds', () => {
      const parsed = parseDuration('23s');
      expect(parsed).toBe(23);
    });
    it('correctly parses minutes', () => {
      const parsed = parseDuration('5m');
      expect(parsed).toBe(5 * 60);
    });
    it('correctly parses hours', () => {
      const parsed = parseDuration('42h');
      expect(parsed).toBe(42 * 60 * 60);
    });
    it('correctly parses days', () => {
      const parsed = parseDuration('31d');
      expect(parsed).toBe(31 * 24 * 60 * 60);
    });
  });
  describe('invoked with invalid duration', () => {
    it('raises a error on syntactically invalid time value', () => {
      const exec = () => parseDuration('dadas');
      expect(exec).toThrow();
    });
    it('raises a error on semantically invalid time value', () => {
      const exec = () => parseDuration('-3d');
      expect(exec).toThrow();
    });
    it('raises a error on invalid time unit', () => {
      const exec = () => parseDuration('5y');
      expect(exec).toThrow();
    });
  });
});
