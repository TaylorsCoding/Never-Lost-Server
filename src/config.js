module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgres://xftmndqpsodrlt:ffdcf5d20b76aeeb046f6b1fd114a25cda93e536f0fb25c5890eee5df6328ab5@ec2-52-200-134-180.compute-1.amazonaws.com:5432/dfqkeg0tu2g84b",
};
