# Stage 3: Final runtime image
FROM base AS runtime

COPY --from=build /app /app
COPY --from=build /app/node_modules /app/node_modules

WORKDIR /app

EXPOSE 3000

CMD ["npm", "run", "start"]
