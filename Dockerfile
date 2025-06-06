FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

RUN chmod +x ./mvnw
RUN ./mvnw package -DskipTests

CMD ["java", "-jar", "target/api_pokemon-0.0.1-SNAPSHOT.jar"]
