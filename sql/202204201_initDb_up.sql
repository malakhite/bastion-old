begin;

create table if not exists migrations (
	migration	integer		primary key,
	applied_at	timestamptz	not null default now()
);

create table if not exists roles (
	id			serial	primary key,
	name		text	not null,
	description	text
);

insert into roles
values
	(1, 'owner'),
	(2, 'admin'),
	(3, 'user'),
	(4, 'guest');

create table if not exists users (
	id			uuid		primary key default gen_random_uuid(),
	email		text		unique not null,
	password	text		not null,
	name		text		not null,
	role_id		integer		not null default 4,
	created_at	timestamptz	not null default now(),
	updated_at	timestamptz	default null,
	deleted_at	timestamptz	default null,

	foreign key (role_id) references roles (id)
);

create table if not exists content_types (
	id		serial	primary key,
	name	text	not null
);

insert into content_types
values
	(1, 'blog'),
	(2, 'status'),
	(3, 'link'),
	(4, 'photograph'),
	(5, 'image'),
	(6, 'video'),
	(7, 'document'),
	(8, 'file');

create table if not exists tags (
	id		serial	primary key,
	name	text	unique not null
);

create table if not exists content (
	id				uuid		primary key default gen_random_uuid(),
	content_type	integer		not null,
	author_id		uuid		not null,
	slug			text		unique,
	created_at		timestamptz	not null default now(),
	published_at	timestamptz	default null,
	updated_at		timestamptz	default null,
	deleted_at		timestamptz	default null,

	foreign key (author_id) references users (id),
	foreign key (content_type) references content_types (id)
);

create table if not exists content_tags (
	id			uuid		primary key default gen_random_uuid(),
	content_id	uuid		not null,
	tag_id		integer		not null,

	foreign key (content_id) references content (id),
	foreign key (tag_id) references tags (id)
);

create table if not exists links (
	id			uuid	primary key default gen_random_uuid(),
	content_id	uuid	not null,
	url			text	not null,
	title		text,
	description	text,

	foreign key (content_id) references content (id)
);

create table if not exists posts (
	id				uuid	primary key default gen_random_uuid(),
	content_id		uuid	not null,
	post_text		text	not null,
	post_json		jsonb,

	foreign key (content_id) references content (id)
);

create table if not exists statuses (
	id			uuid	primary key default gen_random_uuid(),
	content_id	uuid	not null,
	status_text	text	not null,
	status_json	jsonb,

	foreign key (content_id) references content (id)
);

create table if not exists files (
	id			uuid	primary key default gen_random_uuid(),
	content_id	uuid	not null,
	url			text	not null,

	foreign key (content_id) references content (id)
);

insert into migrations
values
	(202204211, default);

commit;