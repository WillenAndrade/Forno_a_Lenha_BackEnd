const Sequelize = require('sequelize');

const sequelize = new Sequelize('feedback', 'root', 'tsqeupaf2025A', {
  host: 'localhost',
  dialect: 'mysql',
});

(async () => {
  try {
   await sequelize.sync();
   console.log('Tabela de FeedBack sincronizada com sucesso!');
 } catch (err) {
   console.error('Erro ao sincronizar a tabela Circuito:', err);
 }
})();

const FeedBack = sequelize.define('feedback', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  suggestion: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
}, {
  // Configurações para timestamps
  timestamps: true, // habilita timestamps
  createdAt: 'created_at', // renomeia o campo createdAt
  updatedAt: 'update_timestamp' // renomeia o campo updatedAt
});

module.exports = FeedBack;
