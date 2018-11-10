// Testing CommentBox
import React from 'react';
import {mount} from 'enzyme';
import Root from 'Root';
import CommentBox from 'components/CommentBox';

let wrapped;
beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox/>
    </Root>
  );
});

afterEach(() => {
  wrapped.unmount();
});


//Tests
//Check if there textarea and buttons in component
it('Has a textarea and button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('Textarea tests', () => {
  beforeEach(() => {
    //Simulate change to textarea
    //Force component update and check if value is as expected
    wrapped.find('textarea').simulate('change', {target: {value: 'new comment'}});
    wrapped.update();
  });

  //Check for changes to textarea text
  it('Has a textarea that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
  });

  //Check if form submit clears textarea
  it('Has no text after submit', () => {
    //Submit form to clear textarea
    wrapped.find('form').simulate('submit');
    wrapped.update();

    //Check if textarea has been cleared
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
