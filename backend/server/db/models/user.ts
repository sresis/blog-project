import {
    Table,
    Column,
    Model,
    HasMany,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
  } from 'sequelize-typescript';
  
  
  @Table({ tableName: 'user' })
  class User extends Model<User> {
    @Column({
      type: DataType.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    })
    id: number;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    username: string;
  
    @Column({
      type: DataType.STRING,
      allowNull: false,
    })
    password: string;
  

  }
  
  export default User;