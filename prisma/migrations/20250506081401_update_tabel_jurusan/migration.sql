/*
  Warnings:

  - You are about to alter the column `tanggal_post` on the `diskusi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `log_aktivitas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_upload` on the `materi_pelajaran` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `waktu` on the `notifikasi` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_kumpul` on the `pengumpulan_tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `tanggal_lahir` on the `siswa` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `deadline` on the `tugas` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `id_users` to the `jurusan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `diskusi` MODIFY `tanggal_post` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `jurusan` ADD COLUMN `id_users` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `log_aktivitas` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `materi_pelajaran` MODIFY `tanggal_upload` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `notifikasi` MODIFY `waktu` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `pengumpulan_tugas` MODIFY `tanggal_kumpul` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `siswa` MODIFY `tanggal_lahir` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `tugas` MODIFY `deadline` DATETIME NOT NULL;

-- AddForeignKey
ALTER TABLE `jurusan` ADD CONSTRAINT `jurusan_id_users_fkey` FOREIGN KEY (`id_users`) REFERENCES `users`(`id_users`) ON DELETE CASCADE ON UPDATE CASCADE;
