@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SongModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String autoPath;
    private String imgPath;
    @Column(name = "lyrics", length =5000)
    private String lyrics;

    @JsonIgnore
    @ManyToMany(mappedBy = "songs")
    private List<ArtistModel> artists = new ArrayList<>();

    @JsonIgnore
    @ManyToMany(mappedBy = "songs")
    private List<GenreModel> genre = new ArrayList<>();

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SongModel songModel = (SongModel) o;
        return Objects.equals(name, songModel.name) && 
               Objects.equals(autoPath, songModel.autoPath);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, autoPath);
    }
}
