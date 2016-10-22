require 'test_helper'

class TelemundoControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get telemundo_index_url
    assert_response :success
  end

end
