import { DynamicPipe } from './dynamic.pipe';

describe('DynamicPipe', () => {
  it('create an instance', () => {
    const pipe = new DynamicPipe(null);
    expect(pipe).toBeTruthy();
  });
});
