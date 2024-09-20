package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.dto.UserLikedSong;
import com.example.demo.models.SongModel;
import com.example.demo.models.User;
import com.example.demo.models.UserSongInteraction;

import jakarta.transaction.Transactional;

public interface UserSongInteractionRepository extends JpaRepository<UserSongInteraction, Long> {
    List<UserSongInteraction> findByUser(User user);

    @Query(value = "SELECT * FROM user_song_interaction WHERE song_id = :song_id and user_id = :user_id", nativeQuery = true)
    List<UserSongInteraction> findDetailsByIds(@Param("user_id") int user_id, @Param("song_id") int song_id);

    @Modifying
    @Transactional
    @Query(value = "update user_song_interaction set liked = :liked,times_listened =:timesListened where user_id = :user_id and song_id = :song_id ;", nativeQuery = true)
    void updateDetailsById(@Param("user_id") int user_id, @Param("song_id") int song_id,
            @Param("timesListened") int timesListened, @Param("liked") int liked);

    @Query("SELECT new com.example.demo.dto.UserLikedSong(s.id, s.autoPath, s.imgPath, s.lyrics, s.name) " +
            "FROM UserSongInteraction ui " +
            "JOIN ui.song s " +
            "WHERE ui.user.id = :user_id AND ui.liked = true")
    List<UserLikedSong> findUserLikeSongs(@Param("user_id") int user_id);

}
