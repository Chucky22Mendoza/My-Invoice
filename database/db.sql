CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS business (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	name character varying not null,
	description character varying not null,
	abrev character varying not null,
	logo_path character varying not null,
	CONSTRAINT business_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS users (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	username character varying not null,
	fullname character varying not null,
	password character varying not null,
	fk_business uuid not null,
	CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS quotes (
	id uuid NOT NULL DEFAULT uuid_generate_v1(),
	fecha date not null,
	titulo_trabajo character varying not null,
	nombre_cliente character varying not null,
	domicilio_cliente character varying not null,
	descripcion_trabajo character varying not null,
	caracteristicas character varying not null,
	anticipo numeric not null,
	total numeric not null,
	numero_letras character varying not null,
	centavos numeric not null,
	json_document jsonb,
	fk_business uuid not null,
	fk_user uuid not null,
	CONSTRAINT quotes_pkey PRIMARY KEY (id),
	CONSTRAINT fk_business_tbl_quotes FOREIGN KEY (fk_business)
        REFERENCES public.business (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
	CONSTRAINT fk_user_tbl_quotes FOREIGN KEY (fk_user)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

-- insert into business values (
-- 	default,
-- 	'Taller de Herrería "EL PARIENTE"',
-- 	'Servicio de soldadura y herrería de Jesús Mendoza, el pariente',
-- 	'THP',
-- 	'/'
-- );

-- select * from business;

-- insert into users values (default, 'el_pariente', 'Jesús Mendoza Ochoa', 'milito22', '997851e0-308c-11ee-bbf5-ae7c0f262578');