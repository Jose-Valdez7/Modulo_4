class UserDTO {
  static toResponse(user) {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  static toCreate(data) {
    return {
      username: data.username,
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role || 'ESTUDIANTE',
    };
  }

  static toUpdate(data) {
    const updateData = {};
    
    if (data.username) updateData.username = data.username;
    if (data.email) updateData.email = data.email;
    if (data.name) updateData.name = data.name;
    if (data.role) updateData.role = data.role;
    if (data.isActive !== undefined) updateData.isActive = data.isActive;
    
    return updateData;
  }
}

module.exports = UserDTO;
