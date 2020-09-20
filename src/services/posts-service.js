const PostsService = {
  getAllPosts(db) {
    return db("neverlostdb_posts").select("*");
  },

  insertPost(db, data) {
    return db("neverlostdb_posts")
      .insert(data)
      .returning("*")
      .then((rows) => rows[0]);
  },

  getById(db, id) {
    return db("neverlostdb_posts").select("*").where({ id }).first();
  },

  deletePost(db, id) {
    return db("neverlostdb_posts").where({ id }).delete();
  },

  updatePost(db, id, data) {
    return db("neverlostdb_posts").where({ id }).update(data);
  },
};

module.exports = PostsService;
