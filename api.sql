CREATE TABLE `items` (
  `id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;


INSERT INTO `items` (`id`, `title`, `description`) VALUES
(1, 'Hola', 'Mundo'),
(2, 'Hola', 'Caracola')

ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;