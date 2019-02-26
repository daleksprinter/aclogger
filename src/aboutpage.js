import React, {Component} from 'react';
import './aboutpage.css'

export default class AboutPage extends Component{
    render(){
        return(
            <div className = 'aboutpage'>
                <div>Version : beta 0.1</div>
                <br></br>
                <div>ACLoggerとは</div>
                    <div>&emsp;競技プログラミングのコンテストサイトやジャッジサイト等で問題を解くことで、草を生やすことができるツールです。</div>
                    <div>&emsp;競プロと草を生やすことが好きなみなさんのために作成されました。</div>
                    <div>&emsp;精進の記録や、モチベーション維持等にお役立てください。</div>
                    <div>&emsp;現状、AtCoderとCodeforcesに対応しています。</div>
                <br></br>
                <div>今後の更新予定</div>
                    <div>&emsp;・ジャッジサイトの追加(AOJ, yukicoder, その他APIが生えているジャッジ等)</div>
                    <div>&emsp;・ジャッジごと(及び合計）のACカウントの表示</div>
                    <div>&emsp;・Daily AC, 合計ACのツイート（及び自動化）</div>
                    <div>&emsp;・提出詳細に飛べるようにする</div>
                    <div>&emsp;・ユーザーネームをcookieに保存</div>
                <br></br>
                <div>作った人</div>
                    <div>&emsp;Twitter : @Gxupu50ILbqonRQ ←要望、バグ報告等はこちらにどうぞ。</div>

            </div>
        )
    }
}

