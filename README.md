Bu proje create-react-app ile oluşturulmuştur [Create React App](https://github.com/facebook/create-react-app).

## Çalıştırmak için

(Not: Projeyi açabilmek için bilgisayarınızda Node yüklü olmalıdır.)

Projeyi bilgisayarınıza klonladıktan sonra:

### `npm install`

komutu ile gerekli modülleri yükleyebilirsiniz.


#### Uygulamayı açmak için
### `npm start`

komutunu koşmanız yeterli uygulama geliştirme modunda başlayacaktır.<br />


Tarayıcınızdan [http://localhost:3000](http://localhost:3000) adresine giderek uygulamanın canlı halini görebilirsiniz.



### Uygulamayı local'de çalıştırmadan, internet üzerinden erişmek için

 [test-project-contact.surge.sh](http://test-project-contact.surge.sh/) adresine gidebilirsiniz.

# contacts

- [https://randomuser.me/](https://randomuser.me/) adresinden random 10 kullanıcı çekilerek 10 kişilik rehber oluşturuldu.kişi sayısı arttırılıp, azaltılabilir.

- [axios](https://github.com/axios/axios) kütüphanesiyle randomuser adresinden rastgele kullanıcıları çektim. Sayfayı her yenilediğinizde kullanıcılar(kayıtlar) değişir.

- Kişi üzerine tıkladığınızda kişi bilgilerinin detayına ulaşılabilir.
Delete butonu çalışır durumdadır.
Edit butonu sadece kişileri düzenleyebileceğiniz bir form açar fakat kişi bilgilerini düzenleme durumu şuan fonksiyonel değildir.

- Projenin tamamında UI kütüphanesi olarak React-__Bootstrap__ kullandım.

- Tarihi formatlamak için [dayjs](https://github.com/iamkun/dayjs) kullandım.
- Iconlar için [fontawesome](https://github.com/FortAwesome/react-fontawesome) kullandım. Örnek olarak rehber sayfasında 2 icon ekledim.
