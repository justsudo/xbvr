yarn install && yarn build && go generate && go build -ldflags "-H windowsgui" -tags=json1 -o dist/xbvr.exe pkg/tray/main.go
