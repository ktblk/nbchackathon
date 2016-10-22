module KeySetter
  def generate_key(key: nil, key_size: 10)
    random_key = SecureRandom.hex(key_size)
    class_name = key || self.class.base_class.name.underscore
    self.send("#{class_name}_key=", random_key)
    return true
  end
end
