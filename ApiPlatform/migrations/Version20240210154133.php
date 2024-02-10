<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240210154133 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE user_boat (user_id INT NOT NULL, boat_id INT NOT NULL, PRIMARY KEY(user_id, boat_id))');
        $this->addSql('CREATE INDEX IDX_A2EFCF83A76ED395 ON user_boat (user_id)');
        $this->addSql('CREATE INDEX IDX_A2EFCF83A1E84A29 ON user_boat (boat_id)');
        $this->addSql('ALTER TABLE user_boat ADD CONSTRAINT FK_A2EFCF83A76ED395 FOREIGN KEY (user_id) REFERENCES "user" (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_boat ADD CONSTRAINT FK_A2EFCF83A1E84A29 FOREIGN KEY (boat_id) REFERENCES boat (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE boat ADD image VARCHAR(255) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('ALTER TABLE user_boat DROP CONSTRAINT FK_A2EFCF83A76ED395');
        $this->addSql('ALTER TABLE user_boat DROP CONSTRAINT FK_A2EFCF83A1E84A29');
        $this->addSql('DROP TABLE user_boat');
        $this->addSql('ALTER TABLE boat DROP image');
    }
}
