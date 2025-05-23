class InscricoesRepository {
  // GET: Buscar inscrições com paginação (opcional)
  async getInscricoes(connection) {
    let query;

    query = 'SELECT * FROM `inscricoes` ORDER BY id DESC';

    try {
      const [result] = await connection.query(query);
      return result;
    } catch (err) {
      throw err;
    }
  }

  // GET: Total de inscrições
  async getTotalInscricoes(connection) {
    try {
      const [result] = await connection.query('SELECT COUNT(*) as total FROM `inscricoes`');
      return result[0].total;
    } catch (err) {
      throw err;
    }
  }

  // POST: Criar nova inscrição
  async createInscricao(connection, data) {
    try {
      const result = await connection.query('INSERT INTO `inscricoes` SET ?', data);
      return result;
    } catch (err) {
      throw err;
    }
  }

  // PUT: Atualizar inscrição por ID
  async updateInscricao(connection, id, newData) {
    try {
      const [result] = await connection.query('UPDATE `inscricoes` SET ? WHERE id = ?', [newData, id]);
      return result;
    } catch (err) {
      throw err;
    }
  }

  // DELETE: Excluir inscrição por ID
  async deleteInscricao(connection, id) {
    try {
      const [result] = await connection.query('DELETE FROM `inscricoes` WHERE id = ?', [id]);
      return result;
    } catch (err) {
      throw err;
    }
  }

  // GET: Obter a maior numeração da subcategoria por categoria (team_class)
  async getUltimoNumSubPorCategoria(connection, categoria) {
    try {
      const [result] = await connection.query(
        'SELECT MAX(num_sub) AS ultimo_sub FROM `inscricoes` WHERE team_class = ?',
        [categoria]
      );
      if (!result || result.length === 0 || result.ultimo_sub == null) {
        return 0;
      }

      return result.ultimo_sub;
    } catch (err) {
      throw err;
    }
  }


  // GET: Obter uma inscrição específica por ID
  async getInscricaoById(connection, id) {
    try {
      const [result] = await connection.query('SELECT * FROM `inscricoes` WHERE id = ?', [id]);
      return result[0] || null;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = InscricoesRepository;