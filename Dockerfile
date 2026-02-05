FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY . .

# Make mvnw executable
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

# Rename the jar to a fixed name
RUN mv target/*.jar app.jar

EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
