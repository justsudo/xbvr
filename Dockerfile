FROM debian:bookworm-slim

RUN apt-get update && \
    apt-get install -y --no-install-recommends ca-certificates tzdata && \
    rm -rf /var/lib/apt/lists/*

COPY xbvr /usr/bin/xbvr
# place data next to the executable like other platforms
COPY xbvr_data/ /usr/bin/xbvr_data/
COPY docker_start.sh /
RUN chmod 777 /docker_start.sh

EXPOSE 9998-9999
VOLUME /root/.config/

CMD ["/usr/bin/xbvr"]
