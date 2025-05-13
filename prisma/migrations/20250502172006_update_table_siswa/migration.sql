/*
  Warnings:

  - You are about to alter the column `tanggal_post` on the `diskusi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `log_aktivitas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_upload` on the `materi_pelajaran` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `notifikasi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_kumpul` on the `pengumpulan_tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deadline` on the `tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `kecamatan` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kelurahan` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rombel` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggal_lahir` to the `siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempat` to the `siswa` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diskusi` MODIFY `tanggal_post` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `log_aktivitas` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `materi_pelajaran` MODIFY `tanggal_upload` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `notifikasi` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pengumpulan_tugas` MODIFY `tanggal_kumpul` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `siswa` ADD COLUMN `dusun` VARCHAR(100) NULL,
    ADD COLUMN `kecamatan` VARCHAR(100) NOT NULL,
    ADD COLUMN `kelurahan` VARCHAR(100) NOT NULL,
    ADD COLUMN `kode_pos` INTEGER NULL,
    ADD COLUMN `rombel` INTEGER NOT NULL,
    ADD COLUMN `rt` INTEGER NULL,
    ADD COLUMN `rw` INTEGER NULL,
    ADD COLUMN `tanggal_lahir` DATETIME NOT NULL,
    ADD COLUMN `tempat` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `tugas` MODIFY `deadline` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `siswa` ADD CONSTRAINT `siswa_rombel_fkey` FOREIGN KEY (`rombel`) REFERENCES `ruangan`(`id_ruangan`) ON DELETE CASCADE ON UPDATE CASCADE;
