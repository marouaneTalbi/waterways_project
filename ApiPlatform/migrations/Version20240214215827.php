<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240214215827 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE boat_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE comment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE establishment_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE kbis_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE note_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE notification_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE refresh_tokens_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE reservation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE slot_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE "user_id_seq" INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE boat (id INT NOT NULL, establishment_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, modele VARCHAR(255) NOT NULL, size DOUBLE PRECISION NOT NULL, capacity INT NOT NULL, min_time INT NOT NULL, address VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, image VARCHAR(255) DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, price DOUBLE PRECISION DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D86E834A8565851 ON boat (establishment_id)');
        $this->addSql('CREATE TABLE comment (id INT NOT NULL, createdby_id INT NOT NULL, boat_id INT NOT NULL, comment TEXT NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_9474526CF0B5AF0B ON comment (createdby_id)');
        $this->addSql('CREATE INDEX IDX_9474526CA1E84A29 ON comment (boat_id)');
        $this->addSql('COMMENT ON COLUMN comment.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE establishment (id INT NOT NULL, createdby_id INT NOT NULL, name VARCHAR(255) DEFAULT NULL, address VARCHAR(255) DEFAULT NULL, start_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, city VARCHAR(100) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DBEFB1EEF0B5AF0B ON establishment (createdby_id)');
        $this->addSql('CREATE TABLE kbis (id INT NOT NULL, createdby_id INT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, name VARCHAR(255) NOT NULL, status INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_FB034038F0B5AF0B ON kbis (createdby_id)');
        $this->addSql('COMMENT ON COLUMN kbis.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('COMMENT ON COLUMN kbis.updated_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE note (id INT NOT NULL, boat_id INT NOT NULL, createdby_id INT NOT NULL, proprete INT NOT NULL, confort INT NOT NULL, performance INT NOT NULL, equipement INT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_CFBDFA14A1E84A29 ON note (boat_id)');
        $this->addSql('CREATE INDEX IDX_CFBDFA14F0B5AF0B ON note (createdby_id)');
        $this->addSql('CREATE TABLE notification (id INT NOT NULL, user_id INT NOT NULL, title VARCHAR(255) NOT NULL, message TEXT NOT NULL, status VARCHAR(50) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_BF5476CAA76ED395 ON notification (user_id)');
        $this->addSql('COMMENT ON COLUMN notification.created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE refresh_tokens (id INT NOT NULL, refresh_token VARCHAR(128) NOT NULL, username VARCHAR(255) NOT NULL, valid TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_9BACE7E1C74F2195 ON refresh_tokens (refresh_token)');
        $this->addSql('CREATE TABLE reservation (id INT NOT NULL, boat_id INT NOT NULL, consumer_id INT NOT NULL, slots_id INT NOT NULL, reservation_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_42C84955A1E84A29 ON reservation (boat_id)');
        $this->addSql('CREATE INDEX IDX_42C8495537FDBD6D ON reservation (consumer_id)');
        $this->addSql('CREATE INDEX IDX_42C849551E91875B ON reservation (slots_id)');
        $this->addSql('CREATE TABLE slot (id INT NOT NULL, boat_id INT NOT NULL, start_booking_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, end_booking_date TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, start_time TIME(0) WITHOUT TIME ZONE NOT NULL, end_time TIME(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AC0E2067A1E84A29 ON slot (boat_id)');
        $this->addSql('CREATE TABLE "user" (id INT NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, token VARCHAR(255) DEFAULT NULL, firstname VARCHAR(255) DEFAULT NULL, lastname VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, is_verified BOOLEAN DEFAULT NULL, phone VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649E7927C74 ON "user" (email)');
        $this->addSql('COMMENT ON COLUMN "user".created_at IS \'(DC2Type:datetime_immutable)\'');
        $this->addSql('CREATE TABLE user_boat (user_id INT NOT NULL, boat_id INT NOT NULL, PRIMARY KEY(user_id, boat_id))');
        $this->addSql('CREATE INDEX IDX_A2EFCF83A76ED395 ON user_boat (user_id)');
        $this->addSql('CREATE INDEX IDX_A2EFCF83A1E84A29 ON user_boat (boat_id)');
        $this->addSql('ALTER TABLE boat ADD CONSTRAINT FK_D86E834A8565851 FOREIGN KEY (establishment_id) REFERENCES establishment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CF0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE comment ADD CONSTRAINT FK_9474526CA1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE establishment ADD CONSTRAINT FK_DBEFB1EEF0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE kbis ADD CONSTRAINT FK_FB034038F0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE note ADD CONSTRAINT FK_CFBDFA14A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE note ADD CONSTRAINT FK_CFBDFA14F0B5AF0B FOREIGN KEY (createdby_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE notification ADD CONSTRAINT FK_BF5476CAA76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C84955A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C8495537FDBD6D FOREIGN KEY (consumer_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE reservation ADD CONSTRAINT FK_42C849551E91875B FOREIGN KEY (slots_id) REFERENCES slot (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE slot ADD CONSTRAINT FK_AC0E2067A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_boat ADD CONSTRAINT FK_A2EFCF83A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_boat ADD CONSTRAINT FK_A2EFCF83A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE boat_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE comment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE establishment_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE kbis_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE note_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE notification_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE refresh_tokens_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE reservation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE slot_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE "user_id_seq" CASCADE');
        $this->addSql('ALTER TABLE boat DROP CONSTRAINT FK_D86E834A8565851');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CF0B5AF0B');
        $this->addSql('ALTER TABLE comment DROP CONSTRAINT FK_9474526CA1E84A29');
        $this->addSql('ALTER TABLE establishment DROP CONSTRAINT FK_DBEFB1EEF0B5AF0B');
        $this->addSql('ALTER TABLE kbis DROP CONSTRAINT FK_FB034038F0B5AF0B');
        $this->addSql('ALTER TABLE note DROP CONSTRAINT FK_CFBDFA14A1E84A29');
        $this->addSql('ALTER TABLE note DROP CONSTRAINT FK_CFBDFA14F0B5AF0B');
        $this->addSql('ALTER TABLE notification DROP CONSTRAINT FK_BF5476CAA76ED395');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C84955A1E84A29');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C8495537FDBD6D');
        $this->addSql('ALTER TABLE reservation DROP CONSTRAINT FK_42C849551E91875B');
        $this->addSql('ALTER TABLE slot DROP CONSTRAINT FK_AC0E2067A1E84A29');
        $this->addSql('ALTER TABLE user_boat DROP CONSTRAINT FK_A2EFCF83A76ED395');
        $this->addSql('ALTER TABLE user_boat DROP CONSTRAINT FK_A2EFCF83A1E84A29');
        $this->addSql('DROP TABLE boat');
        $this->addSql('DROP TABLE comment');
        $this->addSql('DROP TABLE establishment');
        $this->addSql('DROP TABLE kbis');
        $this->addSql('DROP TABLE note');
        $this->addSql('DROP TABLE notification');
        $this->addSql('DROP TABLE refresh_tokens');
        $this->addSql('DROP TABLE reservation');
        $this->addSql('DROP TABLE slot');
        $this->addSql('DROP TABLE "user"');
        $this->addSql('DROP TABLE user_boat');
    }
}
