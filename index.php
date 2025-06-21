<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Get video, music tiktok from link</title>
    <style>/* ... giữ nguyên CSS cũ của bạn ... */</style>
</head>
<body>
<div class="container">
    <h2>Get video, music tiktok from link</h2>
    <h3>Code by LeAnhMinh - LAMDev</h3>
    <form method="POST">
        <input type="text" name="link"
               placeholder="Dán link TikTok tại đây, rồi ấn Get Link"
               required onkeydown="if(event.key==='Enter') this.form.submit();">
        <br>
        <button type="submit">Get link</button>
    </form>

    <?php if ($error): ?>
        <p class="error"><?= $error ?></p>
    <?php endif; ?>

    <?php if ($video_url): ?>
        <div class="title">Tiêu đề video: <?= htmlspecialchars($title) ?></div>
        <h3>🎥 Video no logo</h3>
        <video controls><source src="<?= $video_url ?>" type="video/mp4"></video>
        <div class="link-box">
            <div class="link-text" id="video_link"><?= $video_url ?></div>
        </div>
        <div class="btn-group">
            <button class="copy-btn" onclick="copyToClipboard('video_link')">Sao chép link video</button>
            <button class="download-btn" onclick="downloadFile('<?= $video_url ?>','video.mp4')">Tải về</button>
        </div>

        <h3>🎵 Music</h3>
        <audio controls><source src="<?= $music_url ?>" type="audio/mpeg"></audio>
        <div class="link-box">
            <div class="link-text" id="music_link"><?= $music_url ?></div>
        </div>
        <div class="btn-group">
            <button class="copy-btn" onclick="copyToClipboard('music_link')">Sao chép link music</button>
            <button class="download-btn" onclick="downloadFile('<?= $music_url ?>','music.mp3')">Tải về</button>
        </div>

        <div class="info">
            <p><strong>ID video:</strong> <?= $video_id ?></p>
            <p><strong>Quốc gia:</strong> <?= $region ?></p>
            <p><strong>View:</strong> <?= $view ?></p>
            <p><strong>Tim:</strong> <?= $tim ?></p>
            <p><strong>Comment:</strong> <?= $comment ?></p>
            <p><strong>Share:</strong> <?= $share ?></p>
            <p><strong>Kích Thước video:</strong> <?= $size ?></p>
            <p><strong>Download:</strong> <?= $download ?></p>
            <p><strong>Yêu thích:</strong> <?= $yeu_thich ?></p>
            <p><strong>Thời gian đăng bài:</strong> <?= $time_up ?></p>
            <p><strong>Thời gian xử lý get link:</strong> <?= $processed_time ?> giây</p>
        </div>
    <?php endif; ?>
</div>
