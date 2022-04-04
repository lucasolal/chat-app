CREATE TABLE IF NOT EXISTS messages (
	user_id VARCHAR(100) NOT NULL,
	username VARCHAR(100) NOT NULL,
	submission_time TIMESTAMP NOT NULL,
	message VARCHAR(500) NOT NULL
);

/*
INSERT INTO messages (
	user_id, username, submission_time, message
) VALUES (
	'from-script|12345', 'JoaoDaSilva123', NOW()::timestamp, 'Mensagem de teste gerada no script 2'
);

INSERT INTO messages (
	user_id, username, submission_time, message
) VALUES (
	'from-script|12345', 'JoaoDaSilva123', NOW()::timestamp, 'Mensagem de teste gerada no script 3'
);

INSERT INTO messages (
	user_id, username, submission_time, message
) VALUES (
	'from-script|12345', 'JoaoDaSilva123', NOW()::timestamp, 'Mensagem de teste gerada no script 4'
);
*/